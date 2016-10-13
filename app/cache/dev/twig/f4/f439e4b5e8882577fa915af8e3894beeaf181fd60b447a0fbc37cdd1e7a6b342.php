<?php

/* @Framework/FormTable/form_row.html.php */
class __TwigTemplate_c938f586a70271ff857dd6a50b9afb6a27023e4787ba0e5523cfd851682bf06c extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_deb4fd39a273d0abf51fb53dbe0b0dee61c919b5c5f7fbd13a1e6a7f0968d66a = $this->env->getExtension("native_profiler");
        $__internal_deb4fd39a273d0abf51fb53dbe0b0dee61c919b5c5f7fbd13a1e6a7f0968d66a->enter($__internal_deb4fd39a273d0abf51fb53dbe0b0dee61c919b5c5f7fbd13a1e6a7f0968d66a_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/FormTable/form_row.html.php"));

        // line 1
        echo "<tr>
    <td>
        <?php echo \$view['form']->label(\$form) ?>
    </td>
    <td>
        <?php echo \$view['form']->errors(\$form) ?>
        <?php echo \$view['form']->widget(\$form) ?>
    </td>
</tr>
";
        
        $__internal_deb4fd39a273d0abf51fb53dbe0b0dee61c919b5c5f7fbd13a1e6a7f0968d66a->leave($__internal_deb4fd39a273d0abf51fb53dbe0b0dee61c919b5c5f7fbd13a1e6a7f0968d66a_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/FormTable/form_row.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <tr>*/
/*     <td>*/
/*         <?php echo $view['form']->label($form) ?>*/
/*     </td>*/
/*     <td>*/
/*         <?php echo $view['form']->errors($form) ?>*/
/*         <?php echo $view['form']->widget($form) ?>*/
/*     </td>*/
/* </tr>*/
/* */
