<?php

/* @Framework/Form/form_widget_compound.html.php */
class __TwigTemplate_704c8a35fd748ae029127114a39b81b200ff2692a108408f699416efe2d5b7f0 extends Twig_Template
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
        $__internal_22dc213871bff7a84e9099433d404b7d6629f33c59f9cea95d3ad3502ce58e83 = $this->env->getExtension("native_profiler");
        $__internal_22dc213871bff7a84e9099433d404b7d6629f33c59f9cea95d3ad3502ce58e83->enter($__internal_22dc213871bff7a84e9099433d404b7d6629f33c59f9cea95d3ad3502ce58e83_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_widget_compound.html.php"));

        // line 1
        echo "<div <?php echo \$view['form']->block(\$form, 'widget_container_attributes') ?>>
    <?php if (!\$form->parent && \$errors): ?>
    <?php echo \$view['form']->errors(\$form) ?>
    <?php endif ?>
    <?php echo \$view['form']->block(\$form, 'form_rows') ?>
    <?php echo \$view['form']->rest(\$form) ?>
</div>
";
        
        $__internal_22dc213871bff7a84e9099433d404b7d6629f33c59f9cea95d3ad3502ce58e83->leave($__internal_22dc213871bff7a84e9099433d404b7d6629f33c59f9cea95d3ad3502ce58e83_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_widget_compound.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <div <?php echo $view['form']->block($form, 'widget_container_attributes') ?>>*/
/*     <?php if (!$form->parent && $errors): ?>*/
/*     <?php echo $view['form']->errors($form) ?>*/
/*     <?php endif ?>*/
/*     <?php echo $view['form']->block($form, 'form_rows') ?>*/
/*     <?php echo $view['form']->rest($form) ?>*/
/* </div>*/
/* */
