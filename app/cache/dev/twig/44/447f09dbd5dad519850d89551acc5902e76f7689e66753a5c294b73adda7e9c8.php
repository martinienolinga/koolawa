<?php

/* @Framework/FormTable/form_widget_compound.html.php */
class __TwigTemplate_aec820dc4cacda2732ddf7398239926209740be5c40a1059d1c0440f40f4003b extends Twig_Template
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
        $__internal_08db0da5bc85a661cce5c5f18efeead24eaaf712cebd702be6d4dec287fee27f = $this->env->getExtension("native_profiler");
        $__internal_08db0da5bc85a661cce5c5f18efeead24eaaf712cebd702be6d4dec287fee27f->enter($__internal_08db0da5bc85a661cce5c5f18efeead24eaaf712cebd702be6d4dec287fee27f_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/FormTable/form_widget_compound.html.php"));

        // line 1
        echo "<table <?php echo \$view['form']->block(\$form, 'widget_container_attributes') ?>>
    <?php if (!\$form->parent && \$errors): ?>
    <tr>
        <td colspan=\"2\">
            <?php echo \$view['form']->errors(\$form) ?>
        </td>
    </tr>
    <?php endif ?>
    <?php echo \$view['form']->block(\$form, 'form_rows') ?>
    <?php echo \$view['form']->rest(\$form) ?>
</table>
";
        
        $__internal_08db0da5bc85a661cce5c5f18efeead24eaaf712cebd702be6d4dec287fee27f->leave($__internal_08db0da5bc85a661cce5c5f18efeead24eaaf712cebd702be6d4dec287fee27f_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/FormTable/form_widget_compound.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <table <?php echo $view['form']->block($form, 'widget_container_attributes') ?>>*/
/*     <?php if (!$form->parent && $errors): ?>*/
/*     <tr>*/
/*         <td colspan="2">*/
/*             <?php echo $view['form']->errors($form) ?>*/
/*         </td>*/
/*     </tr>*/
/*     <?php endif ?>*/
/*     <?php echo $view['form']->block($form, 'form_rows') ?>*/
/*     <?php echo $view['form']->rest($form) ?>*/
/* </table>*/
/* */
